import React from "react";
import { Card, CardContent, CardHeader, Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import MusicService from "../../../services/music.service.js";

function MusicCreate() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            singer: "",
            composer: "",
            duration: "",
            likes: 0,  // Mặc định là 0
            status: "Lưu Trữ" // Trạng thái mặc định
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Music title is required").min(2, "Must be at least 2 characters"),
            singer: Yup.string().required("Singer name is required").max(30, "Singer name cannot exceed 30 characters"),
            composer: Yup.string().required("Composer name is required").max(30, "Composer name cannot exceed 30 characters"),
            duration: Yup.string()
                .required("Duration is required")
                .matches(/^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/, "Duration must be in the format hh:mm"),
            likes: Yup.number().required("Likes count is required").integer("Likes must be an integer").min(0, "Likes must be 0 or positive"),
        }),
        onSubmit: values => {
            const musicData = { ...values};

            MusicService.createMusic(musicData).then(() => {
                toast.success("Music created successfully");
                console.log(musicData)
                navigate("/musics");
            }).catch(() => {
                toast.error("Failed to create music");
            });
        }
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ width: 500, p: 3 }}>
                <CardHeader title="Create Music" sx={{ textAlign: "center" }} />
                <CardContent>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {/* Tên bài hát */}
                        <TextField
                            label="Music Title"
                            name="title"
                            fullWidth
                            required
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />

                        {/* Tên ca sĩ */}
                        <TextField
                            label="Singer Name"
                            name="singer"
                            fullWidth
                            required
                            value={formik.values.singer}
                            onChange={formik.handleChange}
                            error={formik.touched.singer && Boolean(formik.errors.singer)}
                            helperText={formik.touched.singer && formik.errors.singer}
                        />

                        {/* Tên nhạc sĩ */}
                        <TextField
                            label="Composer Name"
                            name="composer"
                            fullWidth
                            required
                            value={formik.values.composer}
                            onChange={formik.handleChange}
                            error={formik.touched.composer && Boolean(formik.errors.composer)}
                            helperText={formik.touched.composer && formik.errors.composer}
                        />

                        {/* Thời gian phát */}
                        <TextField
                            label="Duration (hh:mm)"
                            name="duration"
                            fullWidth
                            required
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                            helperText={formik.touched.duration && formik.errors.duration}
                        />

                        {/* Button submit */}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Create Music
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default MusicCreate;
