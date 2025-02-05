import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Editor } from 'react-draft-wysiwyg';
import { 
  EditorState, 
  convertToRaw, 
  ContentState, 
  convertFromHTML 
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosSetup';
import ComplexityInput from './ComplexityInput';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function ProblemForm() {
  const navigate = useNavigate();
  const { problem_id } = useParams();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: EditorState.createEmpty(),
      complexity: 0,
    },
  });

  useEffect(() => {
    async function fetchProblem() {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${problem_id}`);
        const problem = response.data.problem;
        const blocksFromHTML = convertFromHTML(problem.description);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap,
        );
        const editorState = EditorState.createWithContent(contentState);
        reset({
          title: problem.title,
          description: editorState,
          complexity: problem.complexity,
        });
      } catch (error) {
        console.error('Error fetching problem:', error);
      } finally {
        setLoading(false);
      }
    }

    if (problem_id) {
      fetchProblem();
    } else {
      setLoading(false);
    }
  }, [problem_id, reset]);

  const onSubmit = async (data) => {
    const rawContentState = convertToRaw(data.description.getCurrentContent());
    const htmlDescription = draftToHtml(rawContentState);

    const payload = {
      title: data.title,
      description: htmlDescription,
      complexity: data.complexity,
    };

    try {
      if (problem_id) {
        await axiosInstance.put(`/api/v1/problems/${problem_id}`, payload);
        navigate(`/problems/${problem_id}`);
      } else {
        const response = await axiosInstance.post('/api/v1/problems', payload);
        const newId = response.data.problem.id;
        navigate(`/problems/${newId}`);
      }
    } catch (error) {
      console.error('Error updating problem:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this problem?')) {
      try {
        await axiosInstance.delete(`/api/v1/problems/${problem_id}`);
        navigate('/problems');
      } catch (error) {
        console.error('Error deleting problem:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          {problem_id ? 'Edit Problem' : 'New Problem'}
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title.message}</div>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <Controller
              name="description"
              control={control}
              rules={{
                validate: (value) =>
                  value.getCurrentContent().hasText() || 'Description is required',
              }}
              render={({ field }) => (
                <Editor
                  editorState={field.value}
                  onEditorStateChange={field.onChange}
                  wrapperClassName="demo-wrapper"
                  editorClassName={`demo-editor ${errors.description ? 'is-invalid' : ''}`}
                  toolbar={{
                    options: [
                      'inline',
                      'blockType',
                      'fontSize',
                      'fontFamily',
                      'list',
                      'textAlign',
                      'colorPicker',
                      'link',
                      'embedded',
                      'emoji',
                      'remove',
                      'history',
                    ],
                  }}
                />
              )}
            />
            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description.message}
              </div>
            )}
          </div>

          <div className="form-group mt-3">
            <label>Complexity</label>
            <Controller
              name="complexity"
              control={control}
              rules={{ required: 'Complexity is required' }}
              render={({ field }) => (
                <ComplexityInput
                  complexity={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.complexity && (
              <div className="invalid-feedback d-block">
                {errors.complexity.message}
              </div>
            )}
          </div>

          <div className="flex-row-buttons">
            <button type="submit" className="btn btn-primary mt-3">
              {problem_id ? 'Update' : 'Create'}
            </button>
            {problem_id && (
              <button
                type="button"
                className="btn btn-danger mt-3 ml-3"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProblemForm;
