import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Spinner from '../helpers/Spinner';
import axiosInstance from '../../utils/axiosSetup';
import { useAuth } from '../../hooks/AuthProvider';

const CodeEditorForm = ({ languages, problemId }) => {
  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      code: '',
      language: 'cpp'
    }
  });
  const [editorLanguage, setEditorLanguage] = useState('');
  const [editorPlaceholder, setEditorPlaceholder] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [languageCodeMap, setLanguageCodeMap] = useState({});
  const { authHeaders } = useAuth();
  const navigate = useNavigate();
  const selectedLanguage = watch('language');


  useEffect(() => {
    const fetchLastAttempt = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${problemId}/attempts`, {
          headers: authHeaders(),
          params: {
            limit: 1,
            sort: 'desc',
          },
        });
        if (response.data && response.data.length > 0) {
          setLastAttempt(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching last attempt:', error);
      }
    };

    fetchLastAttempt();
  }, [authHeaders, problemId]);

  useEffect(() => {
    if (languages) {
      try {
        const languageDetails = languages.find(lang => lang.css_name === selectedLanguage);
        if (languageDetails) {
          setEditorLanguage(languageDetails.css_name);
          setEditorPlaceholder(languageDetails.placeholder);
          setValue('code', languageCodeMap[selectedLanguage] || languageDetails.placeholder);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error setting language details:', err);
        setError('Error setting language details');
        setLoading(false);
      }
    }
  }, [selectedLanguage, languages, setValue, languageCodeMap]);

  const handleCodeChange = (code) => {
    setLanguageCodeMap(prevMap => ({
      ...prevMap,
      [selectedLanguage]: code
    }));
    setValue('code', code);
  };

  const onSubmit = async (data) => {
    try {
      const selectedLanguageObj = languages.find(lang => lang.css_name === data.language);
      const attemptData = {
        code: data.code,
        language_id: selectedLanguageObj.id,
        problem_id: problemId
      };
      const response = await axiosInstance.post('/api/v1/attempts', { attempt: attemptData }, {
        headers: authHeaders()
      });
      console.log('Attempt created successfully:', response.data);
    } catch (err) {
      console.error('Error creating attempt:', err);
      setError('Error creating attempt');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      {lastAttempt && (
        <>
          <div className="last-attempt">
            <div className='last-attempt-title'>
              <h4 className="">Last Attempt</h4>
              <Link to={`/problems/${problemId}/attempts`} className="btn btn-primary">
                View All Attempts
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Language</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={lastAttempt.id} onClick={() => navigate(`/problem/${problemId}/attempts/${lastAttempt.id}`)}>
                    <td>{lastAttempt.id}</td>
                    <td>{lastAttempt.language.name}</td>
                    <td>
                      <div className={"problem-tag badge badge-pill badge-outline-"+ (lastAttempt.result == "passed" ? "success" : "danger")}>
                        {lastAttempt.result}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

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
                value={field.value}
                language={editorLanguage}
                placeholder={editorPlaceholder}
                padding={15}
                onChange={(evn) => handleCodeChange(evn.target.value)}
                style={{
                  minHeight: '300px',
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
    </>
  );
};

export default CodeEditorForm;
