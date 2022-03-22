import { Alert, Slide, Snackbar, SnackbarCloseReason } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { FC, useState } from "react";
import {useAppDispatch, useAppSelector } from "store";
import {
    removeAppNotification,
    closeNotificationById,
} from "store/slices/appNotificationSlice";
import { selectAppNotifications } from "store/selectors/appNotificationSelectors";
import "./AppSnackbar.scss";

export const AppSnackbar: FC = () => {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(selectAppNotifications);

    const [slide] = useState<
        React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >
    >(Slide);

    const handleClose = (index: number, reason: SnackbarCloseReason) => {
        if (reason !== "clickaway") {
            dispatch(closeNotificationById(0));
            setTimeout(() => {
                dispatch(removeAppNotification());
            }, 500);
        }
    };

    return (
        <React.Fragment>
            {notifications.map((notification, index) => (
                <Snackbar
                    key={`snack-key-${index}`}
                    open={notification.isOpen}
                    autoHideDuration={notifications.length > 1 ? 1000 : 5000}
                    onClose={(_, reason) => handleClose(index, reason)}
                    anchorOrigin={{ horizontal: "center", vertical: "top" }}
                    TransitionComponent={slide}
                >
                    <Alert
                        severity={notification.severity}
                        sx={{ width: "100%" }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </React.Fragment>
    );
};
