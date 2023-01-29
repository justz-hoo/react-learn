import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface postData {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const schema = yup.object().shape({
    title: yup.string().required('You must add a titile'),
    description: yup.string().required('You must add a description to the post'),
  });

  const {register, handleSubmit, formState:{errors} } = useForm<postData>({
    resolver: yupResolver(schema),
  });

  const onCreatePost = (data: postData) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder='Title ...' {...register('title')}/>
      <p style={{color:'darkred'}}>{errors.title?.message}</p>
      <textarea placeholder='Description' {...register('description')}/>
      <p style={{color:'darkred'}}>{errors.description?.message}</p>
      <input type='submit'/>
    </form>
  );
};
