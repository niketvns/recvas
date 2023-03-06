import { useReactMediaRecorder } from "react-media-recorder";
import { BsFillRecordCircleFill, BsRecordCircle } from 'react-icons/bs';
import { BsFillSignStopFill } from 'react-icons/bs'
import { useState, useRef, useEffect } from "react";
// import './RecordView.css'
import './Record.css'

const RecordView = () => {
    const [recordingOptions, setRecordingOptions] = useState({
        videoChoice: false,
        audioChoice: false,
        screenChoice: false
    })
    const [startBtn, setStartBtn] = useState('Start Recording')

    const videoRef = useRef(null);

    const { videoChoice, audioChoice, screenChoice } = recordingOptions;

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        mediaStream,
        previewStream
    } = useReactMediaRecorder({ screen: screenChoice, video: videoChoice, audio: audioChoice });

    useEffect(() => {
        if (previewStream && videoRef.current) {
            videoRef.current.srcObject = previewStream;
        }
    }, [previewStream]);

    const handleChange = (e) => {
        const { value } = e.target;
        console.log(value)
        if (value === 'videoaudio') {
            setRecordingOptions({ screenChoice: false, videoChoice: true, audioChoice: true })
        } else if (value === 'screenaudio') {
            setRecordingOptions({ videoChoice: false, screenChoice: true, audioChoice: true })
        } else if (value === 'screen') {
            setRecordingOptions({ videoChoice: false, screenChoice: true, audioChoice: false })
        } else if (value === 'video') {
            setRecordingOptions({ videoChoice: true, screenChoice: false, audioChoice: false })
        } else if (value === 'audio') {
            setRecordingOptions({ videoChoice: false, screenChoice: false, audioChoice: true })
        }
    }

    const handleRecordingBtn = (val) => {
        if (val === 'start') {
            if (recordingOptions.audioChoice || recordingOptions.videoChoice || recordingOptions.screenChoice) {
                startRecording();
                setStartBtn('Recording');
            } else {
                alert('Please Select a Recording Choice')
            }
        } else if ('stop') {
            stopRecording();
            setStartBtn('Start Recording');
        }
    }


    return (
        <div className="main-recorder">
            <div className="recording-status">
                Recording Status: <b> {status === 'recording' ? <BsRecordCircle className="rec-icon" /> : null} {status}</b>
            </div>
            <div className="recording-options">
                <p className="rec-heading">
                    Recording Choice
                </p>
                <div className="options">
                    <div className="option">
                        <input type="radio" onChange={handleChange} name="recordingoption" id="recordingoptiono1" value="videoaudio" />
                        <label htmlFor="recordingoptiono1">Video + Audio</label>
                    </div>
                    <div className="option">
                        <input type="radio" onChange={handleChange} name="recordingoption" id="recordingoptiono2" value="screenaudio" />
                        <label htmlFor="recordingoptiono2">Screen + Audio</label>
                    </div>
                    <div className="option">
                        <input type="radio" onChange={handleChange} name="recordingoption" id="recordingoptiono3" value="video" />
                        <label htmlFor="recordingoptiono3">Video</label>
                    </div>
                    <div className="option">
                        <input type="radio" onChange={handleChange} name="recordingoption" id="recordingoptiono4" value="screen" />
                        <label htmlFor="recordingoptiono4">Screen</label>
                    </div>
                    <div className="option">
                        <input type="radio" onChange={handleChange} name="recordingoption" id="recordingoptiono5" value="audio" />
                        <label htmlFor="recordingoptiono5">Audio</label>
                    </div>
                </div>

            </div>
            <div className="record-video">
                {
                    status === 'recording' &&
                    <video
                        ref={videoRef}
                        style={{ display: 'block', maxWidth: '100%' }}
                        autoPlay
                        muted
                    />
                }

                <div className="recording-btn">
                    <button className="start-recording" onClick={() => handleRecordingBtn('start')}>
                        <BsFillRecordCircleFill /> {startBtn}
                    </button>
                    <button className="stop-recording" onClick={() => handleRecordingBtn('stop')}>
                        <BsFillSignStopFill />Stop Recording
                    </button>
                </div>

                {mediaBlobUrl && (
                    <div className="recorded-content">
                        <h3>Recorded Item 👇</h3>
                        <video src={mediaBlobUrl} controls loop />
                    </div>
                )}
            </div>

        </div>
    );
};

export default RecordView;