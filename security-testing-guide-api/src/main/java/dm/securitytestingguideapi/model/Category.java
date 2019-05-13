package dm.securitytestingguideapi.model;

import java.util.Arrays;

public enum Category {
    INFO ("Information Gathering"),
    CONFIG ("Configuration and Deployment Management Testing"),
    IDENT ("Identity Management Testing"),
    AUTHN ("Authentication Testing"),
    AUTHZ ("Authorization Testing"),
    SESS ("Session Management Testing"),
    INPVAL ("Input Validation Testing"),
    ERR ("Error Handling"),
    CRYPST ("Cryptography"),
    BUSLOGIC ("Business Logic Testing"),
    CLIENT ("Client Side Testing");

    String fullCategoryName;

    Category(String fullCategoryName) {
        this.fullCategoryName = fullCategoryName;
    }

    public String getFullCategoryName() {
        return fullCategoryName;
    }

    public static Category fromString(String s) {
        for (Category c : values()) {
            if (c.toString().equalsIgnoreCase(s)) {
                return c;
            }
        }
        throw new IllegalArgumentException("ALLOWED VALUES: " + Arrays.toString(values()));
    }

    public static Category fromValue(String value) {
        for (Category c : values()) {
            if (c.fullCategoryName.equalsIgnoreCase(value)) {
                return c;
            }
        }
        throw new IllegalArgumentException("ALLOWED VALUES: " + Arrays.toString(values()));
    }

}
