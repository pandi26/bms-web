import React, { useState } from 'react';

const LoadingMessage = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <div className="flex flex-col items-center space-y-4">
                {/* Dual Spinning Loader with Gradient */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" style={{ borderImage: 'linear-gradient(45deg, #3b82f6, #8b5cf6) 1' }}></div>
                    <div className="absolute inset-2 border-2 border-t-transparent border-purple-500 rounded-full animate-spin-slow" style={{ borderImage: 'linear-gradient(45deg, #8b5cf6, #3b82f6) 1' }}></div>
                </div>
                {/* Pulsating Text */}
                <h2 className="text-xl font-semibold text-gray-800 animate-pulse">
                    Processing your request...
                </h2>
                {/* Engaging Microcopy */}
                <p className="text-sm text-gray-500 animate-fade-in">
                    Hang tight, we're almost there!
                </p>
            </div>
        </div>
    );
};

export default LoadingMessage;