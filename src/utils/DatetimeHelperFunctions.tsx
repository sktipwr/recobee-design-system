import userProfileAPI from 'api/userProfileAPI';
import RNCalendarEvents from 'react-native-calendar-events';
import EncryptedStorage from 'react-native-encrypted-storage';
import { checkIsSeries } from './HelperFunctions';

// convert datetime to yyyyMMDD format
export const yyyyMMDD = (date: any) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

// convert datetime to yyyyMM format
export const yyyyMM = (date: any) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based

    return `${year}-${month}`;
};

// fetching system calendar events
export const getAllCalendarEvents = async() => {
    try {
        //TODO: need to make this range dynamic
        //Get all events between dates
        const result = await RNCalendarEvents.fetchAllEvents(
            new Date('June 10, 2024 6:55:00').toISOString(),
            new Date('June 22, 2024 7:55:00').toISOString()
        );
        return result;
    }
    catch(e){
        console.log({e})
        return null;
    }
}

//Update event(same as saveEvent but we need to specify eventid)
export const updateCalendarEvent = async(eventId: any, startDate: any, endDate: any, eventName: string) => {
    try {
        const eventDetails = await RNCalendarEvents.saveEvent(eventName, {
          id: eventId,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        });
    }
    catch(e){
        console.log({e})
    }
}

//Remove event from calendar by specifying id
export const removeCalendarEvent = async(eventId: any) => {
    try {
        const result = await RNCalendarEvents.removeEvent(eventId);
    }
    catch(e){
        console.log({e})
    }
}

//Get event by id
export const getCalendarEventDetails = async(eventId: any) => {
    try {
        const result = await RNCalendarEvents.findEventById(eventId);
        return result;
    }
    catch(e){
        return null;
        console.log({e})
    }
}

// saving event in the device calendar
export const scheduleCalendarEvent = async(startDate: any, endDate: any, eventName: string) => {
    let eventID = null;
    try {
        await RNCalendarEvents.checkPermissions();
        const response = await RNCalendarEvents.requestPermissions();
        if (response == 'authorized') {
        const calendars = await RNCalendarEvents.findCalendars();
        if(calendars?.length > 0){
            const primaryCalendars = calendars
            ?.filter((c) => c?.isPrimary && c?.allowsModifications)
            ?.map((c) => c?.id);
            const calendarId = primaryCalendars[0];
            if(calendarId) {
                const eventId = await RNCalendarEvents.saveEvent(eventName, {
                    calendarId: calendarId,
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString(),
                });
                eventID = eventId;
            }
            else {
                //fallback if no calendarId is available
                const eventIdResponse = await RNCalendarEvents.saveEvent(eventName, {
                    startDate: startDate,
                    endDate: endDate
                });
                
                eventID = eventIdResponse;
            }
        }
        }
    }
    catch(e){
        console.log({e})
    }
    return eventID;
};

  // update streak network call
  export const updateStreakApi = async (extendedLog: any) => {
    userProfileAPI
          .updateStreakAttendance()
          .then((response) => {})
          .catch((error) => {
            extendedLog.info(
              'Error calling userProfileAPI.updateStreakAttendance with message '+ error
            );
            console.log({error})
          });
  }

  export const convertTimestampTo24HourFormat = (timestamp: any) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Add leading zero to minutes if necessary
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    // Add leading zero to minutes if necessary
    if (hours < 10) {
        hours = '0' + hours;
    }
    // Format hours and minutes as 24-hour time
    return `${hours}:${minutes}`;
};

// duration for scheduled event
export const getMovieDuration = (item: any) => {
    let isSeries = checkIsSeries(item);
    let minsToAdd = isSeries ? 60 : 120;

    if(item?.runningtime){
      try {
        if(typeof item?.runningtime == 'string'){
          minsToAdd = parseInt(item?.runningtime);
        }
        else if(typeof item?.runningtime == 'number'){
          minsToAdd = item?.runningtime;
        }
      }
      catch(e){
        console.log({e})
      }
    }
    let finalValue = formattedDuration(minsToAdd);
    return finalValue;
    
  }

  // formatted duration
  const formattedDuration = (minutes: any) => {
    
    if (isNaN(minutes) || minutes < 0) {
      // add string you want to return when mins are invalid
      return "";
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    let result = '';
    if (hours > 0) {
      result += `${hours}h `;
    }
    if (remainingMinutes > 0 || hours === 0) {
      result += `${remainingMinutes}m`;
    }
    
    return result.trim();
  }

  export const removeSSFromHHMMSS = (time: string) => {
    const parts = time.split(':');
    if (parts.length === 3) {
      return `${parts[0]}:${parts[1]}`;
    } else {
      // add string you want to return format is invalid
      return "";
    }
  }

  // format datetime in ddMMYYYY
  export const ddMMYYYY = (dateString: string) => {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const year = date.getFullYear();

    // Format in dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }

  // get datetime from DDMMYYYY format
  export const getDateFromDDMMYYYY = (dateString: string) => {
    const [day, month, year] = dateString?.split('/').map(Number);

    // Create a Date object from the parsed components
    const date = new Date(year, month - 1, day); // Subtract 1 from month because it's 0-based
    return date;
  }


  export const ddMMYYYY_userReadable = (dateStr: string) => {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    
    // Insert the comma between the month and year
    const parts = formattedDate.split(" ");
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
  }

  //formatted date as January 02, 2025
  export const mmmmDDYYYY = (dateString: string) => {
    const date = new Date(dateString);

    // Format the date
    const options = { year: 'numeric', month: 'long', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;

  }
  
  