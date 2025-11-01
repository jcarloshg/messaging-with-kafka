

export const NoMessagesYet = () => {
    return (
        <div className="flex flex-col h-full items-center justify-center py-12">
            <svg
                className="w-12 h-12 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
            </svg>
            <div className="text-lg text-gray-400 font-medium">No messages yet.</div>
            <div className="text-sm text-gray-300 mt-2">Start the conversation!</div>
        </div>
    );
};
