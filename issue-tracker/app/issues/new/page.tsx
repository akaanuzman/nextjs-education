'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';
import { ChatBubbleIcon } from '@radix-ui/react-icons';

const NewIssuePage = () => {
    return (
        <div className='space-y-3 max-w-xl'>
            <TextField.Root>
                <TextField.Input placeholder='Title' />
            </TextField.Root>

            <TextArea placeholder='Description' />
            <Button variant='soft'>
                <ChatBubbleIcon />
                Submit New Issue
            </Button>
        </div>
    )
}

export default NewIssuePage