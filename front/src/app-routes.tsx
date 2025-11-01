import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

// pages
import { LandingPage } from "./application/welcome/landing-page";
const ChatPage = lazy(() => import("@/application/chat/chat.page"));

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
};