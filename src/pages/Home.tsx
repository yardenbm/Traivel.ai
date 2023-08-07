
import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonLoading,
  IonProgressBar,
} from '@ionic/react';
import { generateGptResponse } from '../api/gpt';
import { Capacitor } from '@capacitor/core';
import AWS from 'aws-sdk';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './Home.css';

import OutputPage from './OutputPage';

const tourGuides = [
  { name: 'Sabo', image: '/assets/images/manTourGuide.jpg' },
  { name: 'Alexa', image: '/assets/images/womanTourGuide.jpg' },
  { name: 'Justin', image: '/assets/images/boyTourGuide.jpg' },
  { name: 'Ivy', image: '/assets/images/girlTourGuide.jpg' },
];


// Use the tourGuides array as needed in your application
// For example, if you're rendering these images in a frontend framework or directly using JavaScript


const Home: React.FC = () => {
  // State variables
  const [person, setPerson] = useState('');
  const [location, setLocation] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [lengthOf, setLengthOf] = useState('');
  const [gptPrompt, setGptPrompt] = useState('');
  const [gptResponse, setGptResponse] = useState('');
  const [speakerName, setSpeakerName] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [audioFileUrl, setAudioFileUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidPerson, setIsValidPerson] = useState(true);
  const [isValidLocation, setIsValidLocation] = useState(true);
  const [isValidSpeaker, setIsValidSpeaker] = useState(true);
  const [isValidLengthOf, setIsValidLengthOf] = useState(true);
  const [responseGenerated, setResponseGenerated] = useState(false);

  const handleLocationChange = (address: string) => {
    setLocation(address);
    setPlaceName(address);
  };

  const handleLocationSelect = (address: string) => {
    setLocation(address);
    setPlaceName(address);
  };

  const validateForm = () => {
    let isValid = true;

    if (!person) {
      setIsValidPerson(false);
      isValid = false;
    } else {
      setIsValidPerson(true);
    }

    if (!location) {
      setIsValidLocation(false);
      isValid = false;
    } else {
      setIsValidLocation(true);
    }

    if (!speaker) {
      setIsValidSpeaker(false);
      isValid = false;
    } else {
      setIsValidSpeaker(true);
    }

    if (!lengthOf) {
      setIsValidLengthOf(false);
      isValid = false;
    } else {
      setIsValidLengthOf(true);
    }

    return isValid;
  };

  const parseLength = (string: string) => {
    if (string === 'regular') {
      return '200 words';
    } else if (string === 'short') {
      return '100 words';
    } else if (string === 'long') {
      return '800 words';
    }
  };


  const handleGenerateGptAndAudioResponse = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const prompt = `write an explanation about ${location} for a ${person} years old, the explanation will be spoken by ${speaker} the tour guide, length should be ${parseLength(
      lengthOf
    )}. keep it gender free, and match the content to a ${person} years old listener.`;

    setGptPrompt(prompt);

    try {
      const gptResponse = await generateGptResponse(prompt);
      setGptResponse(gptResponse);

      // Now that we have the GPT response, we can generate the audio file.
      if (gptResponse) {
        try {
          const response = await fetch('https://6xodtaobpg.execute-api.us-east-1.amazonaws.com/v2/api/audio', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: gptResponse, speaker }),
          });
          setSpeakerName(speaker);

          if (response.ok) {
            const { audioFile, voiceId } = await response.json();
            setAudioFileUrl(audioFile);
            console.log('Selected Voice ID:', voiceId);
          } else {
            console.error('Failed to generate audio:', response.status);
          }
        } catch (error) {
          console.error('Failed to generate audio:', error);
        }
      }
      setSpeaker(speaker);
      console.log('Selected Speaker:', speaker);

      setResponseGenerated(true); // Set the responseGenerated state to true

    } catch (error) {
      console.error('Failed to generate GPT response:', error);
      setGptResponse('Failed to generate GPT response');
    }

    setIsLoading(false);
  };

  const handleSpeakerSelection = (selectedSpeaker: string) => {
    setSpeaker(selectedSpeaker);
  };

  return (
<IonPage>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Your AI Tour Guide</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent className="ion-padding ion-text-center">
    <div className="ion-text-center1">
      <select value={person} onChange={(e) => setPerson(e.target.value)}>
        <option value="">Age of listener?</option>
        <option value="Young boy">5-7</option>
        <option value="Young girl">8-12</option>
        <option value="Adult">13-18</option>
        <option value="Adult">19-39</option>
        <option value="Adult">40-59</option>
        <option value="Adult">60+</option>
      </select>
      {!isValidPerson && <p style={{ color: 'red' }}>This field is required</p>}
    </div>
    <p></p>
    <div className="ion-text-center2" style={{color: 'black',
              backgroundColor: 'white', 
}}>
      <PlacesAutocomplete
        value={location}
        onChange={handleLocationChange}
        onSelect={handleLocationSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="ion-text-center3">
            <input {...getInputProps({ placeholder: "What place are you visiting?" })} />
            <div className="ion-text-center4" style={{color: 'black'}}>
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion, index) => {
            const style = suggestion.active
              ? { backgroundColor: "#fafafa", cursor: "pointer" }
              : { backgroundColor: "#ffffff", cursor: "pointer" };
            return (
              <div {...getSuggestionItemProps(suggestion, { style })}>
                {suggestion.description}
              </div>
            );
          })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {!isValidLocation && <p style={{ color: 'red' }}>This field is required</p>}
    </div>
    <div className="ion-text-center5">
      <h4>Who should be your tour guide?</h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      {tourGuides.map((guide) => (
          <div
            key={guide.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              margin: '0 10px'
            }}
            onClick={() => handleSpeakerSelection(guide.name)}
          >
            <img
              src={guide.image}
              alt={guide.name}
              style={{
                maxWidth: '80%',
                maxHeight: '80%',
                width: 'auto',
                height: 'auto',
                borderRadius: '100%',
                border: speaker === guide.name ? '2px solid #007bff' : 'none',
              }}
            />
            <p>{guide.name}</p>
          </div>
        ))}
      </div>
      {!isValidSpeaker && <p style={{ color: 'red' }}>This field is required</p>}
    </div>
    <div className="ion-text-center6">
    <select
      value={lengthOf}
      onChange={(e) => setLengthOf(e.target.value)}
    >
      <option value="">Choose duration</option>
      <option value="short">30 Seconds</option>
      <option value="regular">1 Minutes</option>
      <option value="long">2 Minutes</option>
    </select>

      {!isValidLengthOf && <p style={{ color: 'red' }}>This field is required</p>}
    </div>
    <p></p>
    <div className="ion-text-center7">
      <IonButton expand="block" onClick={handleGenerateGptAndAudioResponse}>
        Lets go!
      </IonButton>
    </div>
    {isLoading && (
      <div className="ion-text-center8">
        <IonProgressBar type="indeterminate" />
      </div>
    )}
    {responseGenerated && (
      <OutputPage gptPrompt={gptPrompt} gptResponse={gptResponse} audioFileUrl={audioFileUrl} speakerName={speaker} placeName={location}/>
    )}
  </IonContent>
</IonPage>
  );
};

export default Home;
