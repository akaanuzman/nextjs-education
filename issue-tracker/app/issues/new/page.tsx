'use client';

import { Button, Callout, TextArea, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { ChatBubbleIcon, InfoCircledIcon } from '@radix-ui/react-icons';
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
    const [error, setError] = useState('');

    const onSubmit = async (data: NewIssueForm) => {
        try {
            // Make the API call
            await axios.post('/api/issues', data);

            // Redirect to the 'issues' page after successful submission
            router.push('/issues');
        } catch (error: any) {
            if (error.response.data.length === 1) {
                const errorMessage = error.response.data[0].message;
                setError(errorMessage);
                return;
            }
            const errorMessage = error.response.data[0].message + ' ' + error.response.data[1].message;
            setError(errorMessage);
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
            {error && (
                <Callout.Root color='red'>
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
        </form>
    )
}

export default NewIssuePage