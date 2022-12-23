package com.hoaxify.ws.file;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import org.apache.tika.Tika;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@EnableScheduling
public class FileService {
    Tika tika;

    FileAttachmentRepository fileAttachmentRepository;

    public FileService(FileAttachmentRepository fileAttachmentRepository) {
        this.tika = new Tika();
        this.fileAttachmentRepository = fileAttachmentRepository;
    }

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

    public FileAttachment saveObjeAttachment(MultipartFile multipartFile) {
        String fileName = generateRandomName();
        File target = new File("D:/hoaxify/ws/ws/picture-storage/"+fileName);
        try {
            OutputStream outputStream = new FileOutputStream(target);
            outputStream.write(multipartFile.getBytes());
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        FileAttachment attachment = new FileAttachment();
        attachment.setName(fileName);
        attachment.setDate(new Date());
        return fileAttachmentRepository.save(attachment);
    }

    public void deleteFile(String oldImageName) {
        if(oldImageName == null) {
            return;
        }
        try {
            Files.deleteIfExists(Paths.get("D:/hoaxify/ws/ws/picture-storage/"+ oldImageName));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    @Scheduled(fixedRate =  24 * 60 * 60 * 1000)
    public void cleanupStorage() {
        Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - ( 24 * 60 * 60 * 1000));
        List<FileAttachment> filesToBeDeleted = fileAttachmentRepository.findByDateBeforeAndObjeIsNull(twentyFourHoursAgo);
        for(FileAttachment file : filesToBeDeleted) {
            System.out.println("removing file: " + file.getName());
            deleteFile(file.getName());
            fileAttachmentRepository.deleteById(file.getId());
        }

    }
}