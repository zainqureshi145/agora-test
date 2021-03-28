import { Injectable } from '@angular/core';
import AgoraRTC, {IAgoraRTCClient} from 'agora-rtc-sdk-ng';

var rtc = {
  // For the local client.
  client: null,
  // For the local audio and video tracks.
  localAudioTrack: null,
  localVideoTrack: null,
};

var options = {
  // Pass your app ID here.
  appId: "9f7a20c68b094028802f1129c24b1fb9",
  // Set the channel name.
  channel: "agora-demo-test",
  // Pass a token if your project enables the App Certificate.
  token: "0069f7a20c68b094028802f1129c24b1fb9IABDDbv6HgJrGoHM+SLpUnLpspuqx/H6mG2cJ9iWHotfn+XNIEUAAAAAEAC5X9YGeZ5gYAEAAQB4nmBg",
};

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  

  constructor() { }

  //Start A Basic Call
  async startCall() {
    console.log("Inside AgoraService startCall() Function");
    const agoraRTCClient = rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    const uid = await agoraRTCClient.join(options.appId, options.channel, options.token, null);

    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    console.log("publish success!");
    this.joinCall(agoraRTCClient);
  }


  async endCall() {
    console.log("Inside AgoraService endCall() Function");
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    await rtc.client.leave();
    console.log("Disconnected...");
  }

  async joinCall(agoraRTCClient: IAgoraRTCClient) {
    console.log("Inside AgoraService joinCall() Function");
    rtc.localVideoTrack.play('local-stream');
    rtc.localAudioTrack.play();
  }
}
