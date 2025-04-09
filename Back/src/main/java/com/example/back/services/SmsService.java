package com.example.back.services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
public class SmsService {
    private final String ACCOUNT_SID = "AC773508ae951a5c236c256a9e4a9007fa"; // from Twilio
    private final String AUTH_TOKEN = "8b79d84efd13994bf60e13ef923dff61"; // from Twilio
    private final String FROM_PHONE = "+15632847921"; // Twilio number

    public SmsService() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    public void sendSms(String toPhoneNumber, String messageContent) {
        Message message = Message.creator(
                new PhoneNumber(toPhoneNumber), // to phone number
                new PhoneNumber(FROM_PHONE), // from Twilio number
                messageContent // message content
        ).create();
        System.out.println("SMS sent: " + message.getSid());
    }
}
