import React, { useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import { FaBars, FaTimes, FaVideo, FaMoon, FaSun, FaUpload, FaFileAlt, FaMicrophone, FaMicrophoneSlash, FaDesktop, FaClipboard } from "react-icons/fa";

const Telehealth: React.FC = () => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const [peer, setPeer] = useState<Peer | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      setPeerId(id);
      console.log("My Peer ID:", id);
    });

    newPeer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        mediaStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    });

    return () => {
      newPeer.destroy();
    };
  }, []);

  const startCall = () => {
    if (!peer || !remotePeerId) return;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      mediaStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      const call = peer.call(remotePeerId, stream);
      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
      });
    });
  };

  const toggleAudio = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoMuted(!videoTrack.enabled);
      }
    }
  };

  const toggleScreenSharing = () => {
    if (!isScreenSharing) {
      navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
        const videoTrack = stream.getTracks()[0];
        if (mediaStreamRef.current) {
          mediaStreamRef.current.addTrack(videoTrack);
        }
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStreamRef.current;
        }
        setIsScreenSharing(true);
      });
    } else {
      const tracks = mediaStreamRef.current?.getTracks();
      tracks?.forEach(track => track.stop());
      setIsScreenSharing(false);
    }
  };

  const endCall = () => {
    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    setIsScreenSharing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  };

  const copyPeerIdToClipboard = () => {
    if (peerId) {
      navigator.clipboard.writeText(peerId)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000); // Reset the success state after 2 seconds
        })
        .catch(err => {
          console.error("Failed to copy peer ID: ", err);
        });
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex flex-col items-center justify-center`}>
      {/* Mobile Hamburger */}
      <button className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-3 rounded-md">
        <FaBars size={24} />
      </button>

      {/* Dark Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="absolute top-4 right-4 bg-gray-800 text-white p-3 rounded-full">
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-center">Telehealth Video Call</h1>
      <p className="text-gray-500 mb-6 text-center">Enter the Peer ID to connect with the other user.</p>

      {/* Peer ID & Start Call */}
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md text-center mb-8">
        <p className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
          Your ID: <span className="text-blue-500">{peerId}</span>
          <button onClick={copyPeerIdToClipboard} className="ml-2 text-blue-500">
            <FaClipboard size={20} />
          </button>
        </p>
        {copySuccess && <span className="text-green-500 text-sm">ID Copied!</span>}

        <input
          type="text"
          placeholder="Enter Remote Peer ID"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <button onClick={startCall} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full flex items-center justify-center">
          <FaVideo className="mr-2" /> Start Call
        </button>
      </div>

      {/* Video Streams */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <video ref={localVideoRef} autoPlay muted className="w-full h-64 md:h-96 rounded-lg shadow-lg bg-black object-cover" />
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-lg">
            <p>Local</p>
          </div>
        </div>

        <div className="relative">
          <video ref={remoteVideoRef} autoPlay className="w-full h-64 md:h-96 rounded-lg shadow-lg bg-black object-cover" />
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-lg">
            <p>Remote</p>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-4 mt-6">
        <button onClick={toggleAudio} className="bg-gray-700 text-white p-3 rounded-full">
          {isAudioMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
        </button>
        <button onClick={toggleVideo} className="bg-gray-700 text-white p-3 rounded-full">
          {isVideoMuted ? <FaVideo className="text-gray-400" size={24} /> : <FaVideo size={24} />}
        </button>
        <button onClick={toggleScreenSharing} className="bg-gray-700 text-white p-3 rounded-full">
          <FaDesktop size={24} />
        </button>
        <button onClick={endCall} className="bg-red-500 text-white p-3 rounded-full">
          <FaTimes size={24} />
        </button>
      </div>

      {/* Upload Medical History */}
      <div className="mt-8 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-lg font-semibold mb-4">Upload Medical History</h3>
        <label className="flex flex-col items-center border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer">
          <FaUpload size={40} className="text-gray-500 mb-2" />
          <span className="text-gray-500">Drag & Drop or Click to Upload</span>
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
        {uploadedFile && (
          <p className="mt-3 text-sm text-gray-600 flex items-center justify-center">
            <FaFileAlt className="mr-2" /> {uploadedFile.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default Telehealth;
