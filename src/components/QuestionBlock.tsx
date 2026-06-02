"use client"

import { useState } from "react"
import data from "@/lib/data.json"

export default function QuestionBlock() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: string}>({})
    const [totalScore, setTotalScore] = useState(0)

    const currentQuiz = data.questions[currentIndex]
    const correctAnswer = currentQuiz.question.answers.answer
    const currentAnswer = selectedAnswer[currentIndex] || null

    const handleAnswerClick = (key: string) => {
        if (currentAnswer != null) return

        setSelectedAnswer((prev) => ({
            ...prev,
            [currentIndex]: key,
        }))

        if (key === correctAnswer) {
            setTotalScore(totalScore + 1)
        } else {
            setTotalScore(totalScore)
        }
    }

    const handleNext = () => {
        if (currentIndex < data.questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="w-full md:w-3/4 h-auto p-6 shadow-md rounded-lg border border-secondary/20 space-y-6 leading-relaxed tracking-wide">
            <div className="flex items-center justify-between">
                <p className="text-secondary/70">Soal {currentIndex + 1}/{data.questions.length}</p>
                <p className="text-secondary/70">Jawaban Benar {totalScore}/{data.questions.length}</p>
            </div>
            <div className="w-full h-auto rounded-lg border border-secondary/70 p-3 space-y-3">
                <div className="space-y-2">
                    <p>Konversasi:</p>
                    {currentQuiz.conversation.persons.map((value) => (
                        <p key={value.name}><span className="px-2 py-1 rounded bg-secondary/10">{value.name}</span> : {value.text}</p>
                    ))}
                </div>
                <div className="space-y-1 text-secondary/50">
                    <p>Konteks:</p>
                    {Object.entries(currentQuiz.conversation.context).map(([key, value]) => (
                        <p key={key}>{key}: {value}</p>
                    ))}
                </div>
            </div>
            <p className="text-xl">Pertanyaan: {currentQuiz.question.text}</p>
            <div className="space-y-3">
                {currentQuiz.question.answers.options.map((value) => {
                    let buttonStyle = "border-secondary/30 hover:bg-secondary/10"

                    if (currentAnswer != null) {
                        if (value.key === correctAnswer) {
                            buttonStyle = "border-quarternary/50 bg-quarternary/20"
                        } else if (value.key === currentAnswer && currentAnswer !== correctAnswer) {
                            buttonStyle = "border-wrong-answer/50 bg-wrong-answer/20"
                        } else {
                            buttonStyle = "border-secondary/50 bg-secondary/20"
                        }
                    }

                    return (
                        <button
                            key={value.key}
                            onClick={() => handleAnswerClick(value.key)}
                            disabled={currentAnswer != null}
                            className={`w-full p-2 py-1 rounded border text-start space-x-3 ${buttonStyle}`}
                        >
                            <span className={`px-2 py-1 rounded font-bold ${
                                currentAnswer !== null && value.key === correctAnswer
                                ? "bg-quarternary/30"
                                : currentAnswer === value.key
                                ? "bg-wrong-answer/30"
                                : "bg-secondary/30"
                            }`}>
                                {value.key}
                            </span>
                            <span>
                                {value.text}
                            </span>
                        </button>
                    )
                })}
            </div>
            {currentAnswer !== null && (
                <>
                    <div>
                        {currentAnswer === correctAnswer ? (
                            <span className="text-quarternary">Kamu benar!</span>
                        ) : (
                            <span className="text-wrong-answer">Salah, jawaban yang benar yaitu: {currentQuiz.question.answers.answer}</span>
                        )}
                    </div>
                    <div className="space-y-1 text-secondary/50">
                        <p>Alasan: </p>
                        {Object.entries(currentQuiz.question.answers.reason).map(([key, value]) => (
                            <p key={key}>{key}: {value}</p>
                        ))}
                    </div>
                </>
            )}
            <div className="flex gap-3">
                <button 
                    className={`px-2 py-1 border border-secondary rounded ${currentIndex === 0 ? "hidden" : ""}`} 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    Sebelumnya
                </button>
                <button 
                    className={`px-2 py-1 bg-secondary text-primary rounded ${currentIndex === data.questions.length - 1 ? "hidden" : ""}`}
                    onClick={handleNext}
                    disabled={currentIndex === data.questions.length - 1}
                >
                    Selanjutnya
                </button>
            </div>
        </div>
    )
}