import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
    mb20: {
        marginBottom: 20,
    },
    inputField: {
        padding: 10,
        borderColor: '#ABABAB',
        borderWidth: 1,
        borderRadius: 8,
        height: 44,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: Colors.primary,
        height: 50,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'mon-b',
    },
    btnIcon: {
        position: 'absolute',
        left: 20,
    },
}) 