import React, { useRef } from 'react';
import { IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface OutputPageProps {
  gptPrompt: string;
  gptResponse: string;
  audioFileUrl: string;
  speakerName: string;
  placeName: string;
}

const OutputPage: React.FC<OutputPageProps> = ({ gptPrompt, gptResponse, audioFileUrl, speakerName, placeName }) => {
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleGoBack = () => {
    window.location.reload();
  };

  const handleAudioPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleAudioPause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  
  const handleAudioEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0
    }
  };

  const tourGuidesVid = [
    { name: 'Sabo', video: 'assets/images/SaboVid.mp4'},
    { name: 'Alexa', video: 'assets/images/AlexaVid.mp4' },
    { name: 'Justin', video: 'assets/images/JustinVid.mp4' },
    { name: 'Ivy', video: 'assets/images/IvyVid.mp4' },
  ];

  const selectedGuide = tourGuidesVid.find(guide => guide.name === speakerName);
  
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8" size-lg="6">
              {selectedGuide && (
                <div id="vid" style={{textAlign: 'center'}}>
                  <video ref={videoRef} src={selectedGuide.video} style={{
                    maxWidth: '60%',
                    maxHeight: '60%',
                    width: 'auto',
                    height: 'auto',
                    borderRadius: '100%',
                  }} 
                  loop/>
                </div>
              )}

              <h2 style={{textAlign: 'center'}}>Listen</h2>
              <audio controls style={{display: 'block', margin: 'auto'}} onPlay={handleAudioPlay}   onPause={handleAudioPause} onEnded={handleAudioEnd}>
                <source src={audioFileUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <h2 style={{textAlign: 'center'}}>Here's what {speakerName} says about {placeName}:</h2>
              <p style={{textAlign: 'center', lineHeight: '2'}}>{gptResponse}</p>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <IonButton expand="block" onClick={handleGoBack}>
                  Go Back
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default OutputPage;
