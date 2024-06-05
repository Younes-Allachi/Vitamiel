package config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.LocaleResolver;

import java.util.Locale;

public class MyLocaleResolver implements LocaleResolver {


    @Override
    public Locale resolveLocale(HttpServletRequest request) {

        String language = request.getHeader("accept-language");
        if(language == null || language.isEmpty()){
            return Locale.forLanguageTag("en");
        }
        Locale locale = Locale.forLanguageTag(language);
        if(LanguageConfig.Locales.contains(locale)){
            return locale;
        }
        return Locale.forLanguageTag("en");
    }

    @Override
    public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {

    }
}
