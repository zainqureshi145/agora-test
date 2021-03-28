import { Injectable } from '@angular/core';
import AgoraRTC, {IAgoraRTCClient} from 'agora-rtc-sdk-ng';

var rtc = {
  // For the local client.
  client: null,
  audience: null,
  // For the local audio and video tracks.
  localAudioTrack: null,
  localVideoTrack: null,
  remoteAudioTrack: null,
  remoteVideoTrack: null
};

var options = {
  // Pass your app ID here.
  appId: "9f7a20c68b094028802f1129c24b1fb9",
  // Set the channel name.
  channel: "test",
  // Pass a token if your project enables the App Certificate.
  token: "0069f7a20c68b094028802f1129c24b1fb9IAAB4Bsa6Hn/YzTIYu9XumpsaeviLEPVum3gV4VZmJWnvwx+f9gAAAAAEAC5X9YGUQ9iYAEAAQBRD2Jg"
};

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  

  constructor() { }

  //Start A Basic Call
  async startCall() {
    console.log("Inside AgoraService startCall() Function");
    const agoraRTCClient = rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264", role: "host" });
    const uid = await agoraRTCClient.join(options.appId, options.channel, options.token);

    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    rtc.localAudioTrack.play();
    rtc.localVideoTrack.play('local-stream');

    await agoraRTCClient.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    console.log("publish success!");

    console.log(agoraRTCClient.remoteUsers);
    console.log(agoraRTCClient.uid);

    //There are no remote users here

    // for (let i = 0; i < 10; i++){
    //   agoraRTCClient.subscribe(agoraRTCClient.remoteUsers[i], "video");
    // }
  }

  async endCall() {
    console.log("Inside AgoraService endCall() Function");
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    await rtc.client.leave();
    console.log("Disconnected...");
  }

  async joinCall() {
    console.log("Inside AgoraService joinCall() Function");
    const agoraRTCClient = rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264", role: "audience" });
    const uid = await agoraRTCClient.join(options.appId, options.channel, options.token);
    agoraRTCClient.subscribe(agoraRTCClient.remoteUsers[0], "video");
    console.log("SUBSCRIBED??")
    rtc.remoteAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.remoteVideoTrack = await AgoraRTC.createCameraVideoTrack();
    rtc.remoteVideoTrack.play('remote-stream');
  }
}
