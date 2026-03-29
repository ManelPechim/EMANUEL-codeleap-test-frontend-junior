import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext.tsx';

import Button from '../../components/ui/button.tsx';
import Input from '../../components/ui/input.tsx';
import usePostAuthUsers from '../../api/create-auth-users.ts';


type SignUpFormData = {
  username: string;
};

export default function SignUpModal () {
  const navigate = useNavigate();
  const { createAuthUser } = usePostAuthUsers();
  const { setUser } = useUserContext();
  
  const {
    register, 
    handleSubmit, 
    formState: { isValid } 
  } = useForm<SignUpFormData>({ mode: 'onChange' });
 
  const onSubmit = async (data: SignUpFormData) => {
      if (!data.username) return;

      const newUser = await createAuthUser({ username: data.username });
      setUser(newUser);
      navigate('/main');
  }

  return (
    <>
      <main className="flex flex-col w-125 h-[205px] p-6 gap-3 bg-white border rounded-xl border-[#CCCCCC]">
        <h1 className="flex font-bold text-[22px]">
          Welcome to CodeLeap network!
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <label className="flex flex-col text-base">
            Please enter your username
            <Input 
              type='text'
              placeholder="John Doe"
              {...register('username', { required: true })}
            />            
          </label>
        
          <div className="flex justify-end">
            <Button 
              type='submit'
              disabled={!isValid}
              className='w-[111px] h-[32px] uppercase'
            >
              Enter
            </Button>
          </div>
        </form>
      </main>
     {/* {errors?.username && <p className='text-red-600 text-sm'>Deu erro chefe</p>} */}
    </>
  );
}