"use client"
import React, { useState } from 'react'
import { trpc } from '~/trpc/client'

const GuestBook = () => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const createGuestbookEntry = trpc.guestbook.createEntry.useMutation()
    const identifyVisitor = trpc.visitor.identify.useMutation();

    const { data: entries, isLoading } = trpc.guestbook.getEntries.useQuery()

    async function initializeVisitor() {
        const visitorId = localStorage.getItem("visitor_id");

        const visitor = await identifyVisitor.mutateAsync({
            visitorId: visitorId ?? undefined,
        });

        localStorage.setItem("visitor_id", visitor.id);
        return visitor.id;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Validate input
        // get visitorId from local storage 
        // Call the API to create a new guestbook entry
        if (!name.trim() || !message.trim()) {
            alert('Please fill in both fields');
            return;
        }

        let visitorId = localStorage.getItem('visitor_id');

        if (!visitorId) {
            visitorId = await initializeVisitor();
        }

        try {
            await createGuestbookEntry.mutateAsync({
                visitorId: visitorId,
                name,
                message,
            });

            setName("");
            setMessage("");
        } catch (error) {
            console.error("Failed to create guestbook entry:", error);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form name="submit" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type='submit' >Submit</button>
            </form>

            <div>
                {entries?.map((entry) => (
                    <div key={entry.id}>
                        <h3>{entry.name}</h3>

                        <p>{entry.message}</p>

                        <small>
                            {new Date(entry.createdAt).toLocaleString()}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GuestBook
