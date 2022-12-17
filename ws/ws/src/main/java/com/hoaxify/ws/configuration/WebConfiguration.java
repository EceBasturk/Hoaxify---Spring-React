package com.hoaxify.ws.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration //Spring in conf larını ezdiğinde bunu kullanıyorsun
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:D:\\hoaxify\\ws\\ws\\picture-storage/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }
}