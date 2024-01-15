'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';

/// This interface is created new issue form
interface NewIssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<NewIssueForm>();
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const onSubmit = async (data: NewIssueForm) => {
        if (!data.title || !data.description) {
            // Set submit status to 'error' if title or description is empty
            setSubmitStatus('error');
            return;
        }

        try {
            // Make the API call
            await axios.post('/api/issues', data);
            // Set submit status to 'success' if the API call is successful
            setSubmitStatus('success');
            // Redirect to the 'issues' page after successful submission
            router.push('/issues');
        } catch (error) {
            // Set submit status to 'error' if there is an error with the API call
            setSubmitStatus('error');
        }
    };

    return (
        <form className='space-y-3 max-w-xl' onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root>
                <TextField.Input id='title' placeholder='Title' {...register('title')} />
            </TextField.Root>

            <TextArea id='description' placeholder='Description' {...register('description')} />

            <Button variant='soft'>
                <ChatBubbleIcon />
                Submit New Issue
            </Button>
            {submitStatus === 'error' && <p className="text-red-500">Error: Please fill out both title and description.</p>}
            {submitStatus === 'success' && <p className="text-green-500">Success: Issue submitted successfully!</p>}
        </form>
    )
}

export default NewIssuePage