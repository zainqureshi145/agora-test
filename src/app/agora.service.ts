import { Injectable } from '@angular/core';
import AgoraRTC, {IAgoraRTCClient} from 'agora-rtc-sdk-ng';

var rtc = {
  // For the local client.
  host: null,
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

//let remoteUser = 2459608612;
let remoteUsers = [];

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  

  constructor() { }

  //Start A Basic Call
  async startCall() {
    console.log("Inside AgoraService startCall() Function");
    rtc.host = AgoraRTC.createClient({ mode: "rtc", codec: "h264", role: "host" });
    await rtc.host.join(options.appId, options.channel, options.token);

    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    rtc.localAudioTrack.play();
    rtc.localVideoTrack.play('local-stream');

    await rtc.host.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    console.log("publish success!");

    console.log(rtc.host.remoteUsers);
    console.log(rtc.host.uid);

    //There are no remote users here

    // for (let i = 0; i < 10; i++){
    //   agoraRTCClient.subscribe(agoraRTCClient.remoteUsers[i], "video");
    // }
  }

  async endCall() {
    console.log("Inside AgoraService endCall() Function");
    rtc.localAudioTrack.close();
    rtc.localVideoTrack.close();
    rtc.remoteAudioTrack.close();
    rtc.remoteVideoTrack.close();
    await rtc.host.leave();
    await rtc.audience.leave();
    console.log("Disconnected...");
  }

  async joinCall() {
    console.log("Inside AgoraService joinCall() Function");
    rtc.audience = AgoraRTC.createClient({ mode: "rtc", codec: "h264", role: "audience" });
    const uid = await rtc.audience.join(options.appId, options.channel, options.token);
    const remoteUsers = rtc.audience.subscribe(rtc.host, "video");
    console.log("SUBSCRIBED??")
    console.log(rtc.host);
    remoteUsers.remoteVideoTrack.play('remote-stream');

    //console.log("UID: ", agoraRTCClient.uid);
    //console.log("Remote User: ",agoraRTCClient.remoteUsers);
    //rtc.remoteAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    //rtc.remoteVideoTrack = await AgoraRTC.createCameraVideoTrack();
    //rtc.remoteVideoTrack.play('remote-stream');
  }
}
