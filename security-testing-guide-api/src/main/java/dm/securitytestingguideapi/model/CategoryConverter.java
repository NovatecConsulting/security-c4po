package dm.securitytestingguideapi.model;

import java.beans.PropertyEditorSupport;

public class CategoryConverter extends PropertyEditorSupport {

    public void setAsText(final String text) throws IllegalArgumentException {
        setValue(Category.fromString(text));
    }

}
