import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    infoSection: {
        marginTop: 20,
    },
    searchSection: {
        width: 300,
    },
    button: {
        width: 100,
    },
    attachWrapper: {
        marginTop: 20,
    },
    imageWrapper: {
        marginBottom: 10,
    },
    image: {
        maxWidth: 300,
    },
    normalFileWrapper: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    commentDeleteBtn: {
        marginTop: 15,
        marginBottom: 10,
    },
    commentWrapper: {
        border: '1px solid #ccc',
        borderRadius: 5,
        padding: 8,
        marginBottom: 10,
    },
    reasonInput: {
        width: 400,
    },
    reasonWrapper: {
        marginTop: 20,
    },
}));
