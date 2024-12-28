'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const router = useRouter();

  return (
    <form
      className="flex flex-col gap-4 max-w-md mx-auto"
      onSubmit={handleSubmit((data) => {
        router.push(`/contact/success?name=${data.name}&email=${data.email}`);
      })}
    >
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className="border border-gray-300 rounded-md p-2"
        {...register('name')}
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        className="border border-gray-300 rounded-md p-2"
        {...register('email')}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
