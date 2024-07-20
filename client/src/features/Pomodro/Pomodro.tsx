import React, { useState, useEffect } from 'react';

const PomodoroClock: React.FC = () => {
    const [time, setTime] = useState<number>(1500);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreak, setIsBreak] = useState<boolean>(false);
    const [tab, settab] = useState<number>(1);
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval!);
        }
        if (time === 0) {
            clearInterval(interval!);
            setIsBreak(!isBreak);
            setTime(isBreak ? 1500 : 300);
        }
        return () => clearInterval(interval!);
    }, [isActive, time, isBreak]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    const setPomodro = (num: number) => {
        if (num == 1 && tab != 1) {
            settab(1);
            setTime(1500); // Set time for Pomodoro
            setIsBreak(false);
            setIsActive(false)
        }
        else if (num == 2 && tab != 2) {
            settab(2);
            setTime(300);
            setIsBreak(true);
            setIsActive(false)
        }
        else if (num == 3 && tab != 3) {
            settab(3);
            setTime(900);
            setIsActive(false);
            setIsBreak(true);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className='flex flex-row justify-evenly items-center'>
                <div className={`m-2 p-2 cursor-pointer  rounded-xl ${tab === 1 ? 'border-4 border-blue-500 bg-gray-300' : 'border-2 border-gray-300'
                    }`} onClick={(e) => setPomodro(1)} >
                    POMODRO
                </div>
                <div className={`m-2 p-2 cursor-pointer rounded-xl ${tab === 2 ? 'border-4 border-blue-500 bg-gray-300' : 'border-2 border-gray-300'
                    }`} onClick={(e) => setPomodro(2)} >
                    SHORT BREAK
                </div>
                <div className={`m-2 p-2 cursor-pointer rounded-xl ${tab === 3 ? 'border-4 border-blue-500 bg-gray-300' : 'border-2 border-gray-300'
                    }`} onClick={(e) => setPomodro(3)} >
                    LONG BREAK
                </div>
            </div >
            <h1 className="text-3xl font-bold mb-2">
                {isBreak ? 'Break Time!' : 'Work Time!'}
            </h1>
            <h2 className="text-6xl font-mono mb-4">{formatTime(time)}</h2>
            <div className="flex space-x-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setIsActive(!isActive)}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setTime(isBreak ? 300 : 1500)}
                >
                    Reset
                </button>
            </div>
        </div >
    );
};

export default PomodoroClock;