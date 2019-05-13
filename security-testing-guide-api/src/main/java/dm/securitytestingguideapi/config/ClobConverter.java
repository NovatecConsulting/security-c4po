package dm.securitytestingguideapi.config;

import org.springframework.core.convert.converter.Converter;

import java.sql.Clob;
import java.sql.SQLException;

public class ClobConverter implements Converter<Clob, String> {

    @Override
    public String convert(Clob clob) {
        try {
            int length = Math.toIntExact(clob.length());
            if (length == 0) {
                return "";
            } else {
                return clob.getSubString(1, length);
            }
        } catch (SQLException e) {
            throw new IllegalStateException(e);
        }
    }

}
