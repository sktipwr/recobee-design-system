import React, { useState, useEffect } from "react";
import { Chip } from 'react-native-paper';
import { AppConsumer } from "context";

export default function ChipWrapper(props) {
    const { chipKey, value, chipPressed, sel, disabled, textStyle, category, style} = props;
    const [selected, setSelected] = useState(props?.sel ?? false);

    useEffect(() => {
        if (sel == 'true' || sel == true) {
            setSelected(true)
        } else {
            setSelected(false);
        }
    }, [selected]);

    const handlePress = () => {
        setSelected(!selected);
        if (chipPressed) {
            chipPressed(value, !selected, category);
        }
    };


    const customStyle = style || [];
    return (
        <AppConsumer>
            {appConsumer => (
                <Chip
                    key={chipKey}
                    disabled={disabled}
                    mode="outlined"
                    style={[customStyle, {
                        borderColor: props?.sel ? `#F6CE3D` : appConsumer.theme.colors.text,
                        backgroundColor: props?.sel ? appConsumer.theme.colors.buttonSecondaryPressed : appConsumer.theme.colors.grey9,
                        borderWidth: 0,
                        borderRadius: 8,
                    }]}
                    selectedColor={(props?.sel ? "#F6CE3D" : appConsumer.theme.colors.text)}
                    textStyle={textStyle}
                    onPress={handlePress}>
                    {value}
                </Chip>
            )}
        </AppConsumer>
    );



}