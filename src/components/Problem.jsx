import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import CodeEditor from '@uiw/react-textarea-code-editor';
import axiosInstance from '../utils/axiosSetup';
import { useAuth } from '../hooks/AuthProvider';
import Tag from './Tag';
import Complexity from './Complexity';

function Problem() {
  const [problem, setProblem] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorLanguage, setEditorLanguage] = useState('');
  const [editorPlaceholder, setEditorPlaceholder] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const { authHeaders } = useAuth();

  console.log(problem);

  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      code: '',
      language: 'cpp'
    }
  });

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${params.id}`, {
          headers: authHeaders(),
        });
        setTimeout(() => {
          setProblem(response.data);
          if (response.data) {
            setLoading(false);
          }
        }, 350);
      } catch (error) {
        console.error('Error fetching problem:', error);
      }
    };

    fetchProblem();
  }, [authHeaders, params.id]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/languages`, {
          headers: authHeaders(),
        });
        setTimeout(() => {
          setLanguages(response.data);
          if (response.data) {
            setLoading(false);
          }
        }, 350);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, [authHeaders]);

  const selectedLanguage = watch('language');

  useEffect(() => {
    if (languages) {
      const languageDetails = languages.find(lang => lang.css_name === selectedLanguage);
      if (languageDetails) {
        setEditorLanguage(languageDetails.css_name);
        setEditorPlaceholder(languageDetails.placeholder);
        setValue('code', languageDetails.placeholder);
      }
    }
  }, [selectedLanguage, languages, setValue]);

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  if (loading || !problem) {
    return (
      <div className="spinner-wrapper">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#fff"
          radius="10"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h2 className="page-title"> Problem #{problem.id} </h2>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" onClick={() => navigate("/problems")}>
              <a className="text-white" href="/problems">Problems</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {problem.title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="row">
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="problem-title">
                <h2>{problem.title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="problem-tags">Tags</h4>
              <div className="problem-tags">
                {problem?.tags?.map((tag) => (
                  <Tag key={tag.id} id={tag.id} name={tag.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="req-row">
                <i className="mdi mdi-memory req-icon"></i>
                <h5 className="req-text">Memory Limit: 16 MB</h5>
              </div>
              <div className="req-row">
                <i className="mdi mdi-timer req-icon"></i>
                <h4 className="req-text">Time Limit: 1 sec</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="center-text">Complexity</h4>
              <div className="problem-complexity">
                <Complexity complexity={problem.complexity} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h3>Description</h3>
              <p>{problem.description}</p>
            </div>
          </div>
        </div>
        {languages && (
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group language-select">
                    <label htmlFor="language">Language</label>
                    <select id="language" {...register('language')} className="form-control">
                      {languages.map(language => (
                        <option key={language.id} value={language.css_name}>
                          {language.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <Controller
                      name="code"
                      control={control}
                      render={({ field }) => (
                        <CodeEditor
                          {...field}
                          language={editorLanguage}
                          placeholder={editorPlaceholder}
                          padding={15}
                          style={{
                            minHeight: '450px',
                            backgroundColor: 'rgb(13, 17, 22)',
                            fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
                            fontSize: '14px'
                          }}
                          className="textarea-code-editor"
                        />
                      )}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Problem;
