declare module "react-native-push-notification" {

    interface NotificationOptions {
        // iOS & Android
        title?: string,         // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        message: string,
        playSound?: boolean,    // (optional) default: true
        soundName?: string,     // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number?: string,        // no idea. From the docs: "(optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)"
        repeatType?: 'time' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year', //Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
       
        // iOS only 
        alertAction?: any,   // (optional) default: view
        category?: any,      // (optional) default: null
        userInfo?: any,      // (optional) default: null (object containing additional notification data)

        // Android Only
        id?: string,            // (optional) Valid unique 32 bit integer specified as string. default: Auto generated Unique ID
        ticker?: string,        // (optional)
        autoCancel?: boolean,   // (optional) default: true
        largeIcon?: string,     // (optional) default: "ic_launcher"
        smallIcon?: string,     // (optional) default: "ic_notification" with fallback for "ic_launcher"
        bigText?: string,       // (optional) default: "message" prop
        subText?: string,       // (optional) default: none
        color?: string,         // (optional) default: system default
        vibrate?: boolean,      // (optional) default: true
        vibration?: number,     // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag?: string,           // (optional) add tag to message
        group?: string,         // (optional) add group to message
        ongoing?: boolean,      // (optional) set whether this is an "ongoing" notification
        repeatTime?: number,
        actions?: "Yes" | "No", // (Android only) See the doc for notification actions to know more
    } 
    
    interface LocalNotificationOptions extends NotificationOptions {
        date: Date
    }

    /**
     * Object passed to `NotificationConfig.onNotification()`
     */
    interface Notification { 
        // all notifications
        foreground: boolean;
        userInteraction: boolean;
        message: string | any;
        data: any;

        // iOS only?
        badge?: number;
        alert?: string | any;
        sound?: string;
        finish: (result: string) => void;
    }

    interface NotificationConfig { 
        onRegister?: (token: any) => void;
        onNotification?: (notification: Notification) => void;
        senderID?: string; // android only
        permissions?: { alert: boolean, badge: boolean, sound: boolean }; //iOS only

        /**
         * Should the initial notification be popped automatically
         * default: true
         */
        popInitialNotification?: boolean;


        /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
        requestPermissions?:  boolean
    }

    /**
     * Call this when the app launches. 
     * @param options 
     */
    export function configure(options: NotificationConfig): void;
    export function cancelAllLocalNotifications(): void;
    export function cancelLocalNotifications(userInfo: any): void;
    export function localNotification(options: NotificationOptions): void;
    export function localNotificationSchedule(options: LocalNotificationOptions): void;
    export function unregister(): void;
    export function checkPermissions(callback: (value?: { alert?: boolean}) => void): void;

    export const handler: any;
}
