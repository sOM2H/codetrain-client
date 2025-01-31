import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Spinner from '../helpers/Spinner';
import axiosInstance from '../../utils/axiosSetup';
import { useAuth } from '../../hooks/AuthProvider';
import consumer from '../../utils/cable';
import Score from './Score';

const CodeEditorForm = ({ languages, params }) => {
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
  const [contest, setContest] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const selectedLanguage = watch('language');

  let prefix = '';

  if (params.contest_id) {
    prefix = `/contests/${params.contest_id}`;
  }

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/contests/${params.contest_id}`);
        setContest(response.data.contest);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contest data:', error);
        setLoading(false);
      }
    };

    if (params.contest_id) {
      fetchContestData();
    }
  }, [params.contest_id]);

  const isContestActive = contest && new Date() >= new Date(contest.start_time) && new Date() <= new Date(contest.end_time);

  const handleExampleClick = () => {
    const languageDetails = languages.find(lang => lang.css_name === selectedLanguage);
    if (languageDetails) {
      setLanguageCodeMap(prevMap => ({
        ...prevMap,
        [languageDetails.css_name]: languageDetails.placeholder
      }));
      setValue('code', languageDetails.placeholder);
    }
  };

  useEffect(() => {
    const fetchLastAttempt = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/problems/${params.problem_id}/attempts`, {
          params: {
            limit: 1,
            sort: 'desc',
            contest_id: params.contest_id,
          },
        });
        if (response.data.attempts && response.data.attempts.length > 0) {
          setLastAttempt(response.data.attempts[0]);
        }
      } catch (error) {
        console.error('Error fetching last attempt:', error);
      }
    };

    fetchLastAttempt();
  }, [params.problem_id]);

  useEffect(() => {
    consumer.subscriptions.create({ channel: 'AttemptsChannel', problem_id: params.problem_id, user_id: currentUser.id }, {
      received(data) {
        console.log('Received data:', data);
        setLastAttempt(data);
      }
    });
  }, [params.problem_id, currentUser.id]);

  useEffect(() => {
    if (languages) {
      try {
        const languageDetails = languages.find(lang => lang.css_name === selectedLanguage);
        if (languageDetails) {
          setEditorLanguage(languageDetails.css_name);
          // setEditorPlaceholder(languageDetails.placeholder);
          const currentCode = languageCodeMap[selectedLanguage];
          setValue('code', currentCode !== undefined ? currentCode : '');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error setting language details:', err);
        setError('Error setting language details');
        setLoading(false);
      }
    }
  }, [selectedLanguage, languages, setValue, languageCodeMap]);

  useEffect(() => {
    if (lastAttempt) {
      const languageDetails = languages.find(lang => lang.id === lastAttempt.language.id);
      if (languageDetails) {
        setLanguageCodeMap(prevMap => ({
          ...prevMap,
          [languageDetails.css_name]: lastAttempt.code
        }));
        setValue('language', languageDetails.css_name);
      }
    }
  }, [lastAttempt, languages, setValue]);

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
        problem_id: params.problem_id,
        contest_id: params.contest_id
      };
      const response = await axiosInstance.post('/api/v1/attempts', { attempt: attemptData });
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

  const isSubmitDisabled = lastAttempt && (lastAttempt.result === "Pending" || lastAttempt.result === "Running");
  const isCodeEmpty = !watch('code').trim();

  return (
    <>
      {lastAttempt && (
        <div className="last-attempt">
          <div className='last-attempt-title'>
            <h4 className="">Last Attempt</h4>
            <Link to={`${prefix}/problems/${params.problem_id}/attempts`} className="btn btn-primary">
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
                  <th>Test</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr key={lastAttempt.id} onClick={() => navigate(`${prefix}/problems/${params.problem_id}/attempts/${lastAttempt.id}`)}>
                  <td>{lastAttempt.id}</td>
                  <td>{lastAttempt.language.name}</td>
                  <td>
                    <div className={"problem-tag badge badge-pill badge-outline-"+ (
                      lastAttempt.result === "Passed" ? "success" : (lastAttempt.result === "Running" ? "warning" : "danger")
                      )}>
                      {lastAttempt.result}
                    </div>
                  </td>
                  <td>{(lastAttempt.log && lastAttempt.result !== "Passed") && lastAttempt.log}</td>
                  <td><Score value={lastAttempt.rounded_score} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {isContestActive && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <div className='language-form'>
              <select
                id="language"
                {...register('language')}
                className="form-control"
                defaultValue={selectedLanguage}
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.css_name}>{lang.name}</option>
                ))}
              </select>
              <button type="button" onClick={handleExampleClick} className="btn btn-primary" disabled={isSubmitDisabled}>Example</button>
            </div>
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
                  data-gramm="false"
                  data-gramm_editor="false"
                  data-enable-grammarly="false"
                />
              )}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitDisabled || isCodeEmpty}>Submit</button>
        </form>
      )}
      
      {!isContestActive && (
        <div className="alert alert-info">
          This contest is not active. You cannot submit any attempts.
        </div>
      )}
    </>
  );
};

export default CodeEditorForm;
