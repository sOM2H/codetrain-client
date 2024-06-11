import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Spinner from '../helpers/Spinner';

const CodeEditorForm = ({ languages }) => {
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
  const selectedLanguage = watch('language');

  useEffect(() => {
    if (languages) {
      try {
        const languageDetails = languages.find(lang => lang.css_name === selectedLanguage);
        if (languageDetails) {
          setEditorLanguage(languageDetails.css_name);
          setEditorPlaceholder(languageDetails.placeholder);
          setValue('code', languageDetails.placeholder);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error setting language details:', err);
        setError('Error setting language details');
        setLoading(false);
      }
    }
  }, [selectedLanguage, languages, setValue]);

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
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
  );
};

export default CodeEditorForm;
