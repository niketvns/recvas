import { useReactMediaRecorder } from "react-media-recorder";
import { BsFillRecordCircleFill, BsRecordCircle } from 'react-icons/bs';
import { BsFillSignStopFill } from 'react-icons/bs'
import { BsMicMuteFill } from 'react-icons/bs'
import { BsFillMicFill } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import { IoStop } from 'react-icons/io5'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { BsEyeFill } from 'react-icons/bs'
import { useState, useRef, useEffect } from "react";
import './Record.css'

const Record = () => {
    const [recordingOptions, setRecordingOptions] = useState({
        videoChoice: false,
        audioChoice: false,
        screenChoice: false
    })
    const [startBtn, setStartBtn] = useState('Start Recording')
    const [isPause, setIsPause] = useState(false)
    const [isMute, setIsMute] = useState(false)

    const videoRef = useRef(null);

    const { videoChoice, audioChoice, screenChoice } = recordingOptions;

    const {
        status,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        muteAudio,
        unmuteAudio,
        mediaBlobUrl,
        mediaStream,
        previewStream
    } = useReactMediaRecorder({ screen: screenChoice, video: videoChoice, audio: audioChoice });

    useEffect(() => {
        if (previewStream && videoRef.current) {
            videoRef.current.srcObject = previewStream;
        }
    }, [previewStream]);

    useEffect(() => {
        if (status === 'recording' || status === 'paused') {
            setStartBtn('Recording');
        }
    }, [status]);

    const handleChange = (e) => {
        const { value } = e.target;
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
            window.scrollTo({ top: 2000, left: 0, behavior: 'smooth' });
            if (recordingOptions.audioChoice || recordingOptions.videoChoice || recordingOptions.screenChoice) {
                startRecording();
            } else {
                alert('Please Select a Recording Choice')
            }
        } else if ('stop') {
            stopRecording();
            setStartBtn('Start Recording');
            setIsMute(false);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    return (
        <div className="main-recorder">
            <div className="left-main-recorder">
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
                    <div className="recording-btn">
                        <button className="start-recording" onClick={() => handleRecordingBtn('start')}>
                            <BsFillRecordCircleFill /> {startBtn}
                        </button>
                    </div>

                </div>

                <div className="recording-status-preview">
                    <div className="recording-status">
                        Recording Status: <b> {status === 'recording' ? <BsRecordCircle className="rec-icon" /> : null} {status}</b>
                    </div>

                    <div className="record-preview">
                        <p className="preview-heading"><BsEyeFill />Preview</p>
                        <div className="video-preview">
                            {
                                status === 'recording' ?
                                    <span className="play-pause"><BsRecordCircle /></span> :
                                    status === 'paused' ?
                                        <span className="play-pause"><FaPause /></span> :
                                        null
                            }
                            {
                                isMute ?
                                    <span className="muted"><BsMicMuteFill /></span> :
                                    null
                            }
                            {
                                (status === 'recording' || status === 'paused') &&
                                <video
                                    ref={videoRef}
                                    style={{ display: 'block', maxWidth: '100%' }}
                                    autoPlay
                                    muted
                                />
                            }
                        </div>

                        {
                            (status === 'recording' || status === 'paused') && (
                                <div className="recording-btn">
                                    {
                                        isPause ?
                                            <button className="resume-recording" onClick={() => {
                                                resumeRecording();
                                                setIsPause(false);
                                            }}>
                                                <FaPlay /> Resume
                                            </button> :
                                            <button className="pause-recording" onClick={() => {
                                                pauseRecording();
                                                setIsPause(true);
                                            }}>
                                                <FaPause /> Pause
                                            </button>
                                    }
                                    {
                                        isMute ?
                                            <button className="unmute-recording" onClick={() => {
                                                // unmuteAudio();
                                                // setIsMute(false);
                                            }}>
                                                <BsMicMuteFill /> Muted
                                            </button> :
                                            <button className="mute-recording" onClick={() => {
                                                muteAudio();
                                                setIsMute(true);
                                            }}>
                                                <BsMicMuteFill /> Mute
                                            </button>
                                    }
                                    <button className="stop-recording" onClick={() => handleRecordingBtn('stop')}>
                                        <IoStop /> Stop
                                    </button>
                                </div>
                            )
                        }

                    </div>
                </div>

            </div>
            <div className="right-main-recorder">
                <div className="heading">
                    Recorded Items
                </div>
                <div className="recorded-videos">
                    <div className="ind-video">
                        {
                            mediaBlobUrl ?
                                (
                                    <>
                                        <video src={mediaBlobUrl} controls />
                                        <a href={mediaBlobUrl} download>
                                            <button><FaCloudDownloadAlt />Download</button>
                                        </a>
                                    </>
                                ) : (
                                    <p>No Recording Found</p>
                                )
                        }
                    </div>

                </div>
            </div>


        </div >
    );
};

export default Record;





