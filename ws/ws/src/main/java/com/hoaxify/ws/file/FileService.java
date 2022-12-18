package com.hoaxify.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Base64;
import java.util.UUID;
import java.util.logging.Logger;

import org.apache.tika.Tika;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class FileService {
    Tika tika = new Tika();
    public String writeBase64EncodedStringToFile(String image) throws IOException {


        String fileName = generateRandomName();
        File target = new File("D:/hoaxify/ws/ws/picture-storage/"+fileName);
        OutputStream outputStream = new FileOutputStream(target);

        byte[] base64enoded = Base64.getDecoder().decode(image);

        String fileType = tika.detect(base64enoded);
        System.out.println(fileType);

        outputStream.write(base64enoded);
        outputStream.close();
        return fileName;
    }

    public String generateRandomName() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public String detectType(String value) {
        byte[] base64encoded = Base64.getDecoder().decode(value);
        return tika.detect(base64encoded);
    }

}