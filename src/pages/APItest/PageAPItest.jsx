import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, deleteArticles } from "../../store/articles/action"

import '../APItest/PageAPItest.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';







export function PageAPItest() {

    const dispatch = useDispatch()

    //достаем массив информации из стора
    const articles = useSelector((state) => state.articles.articles)

    //достаем статус загрузки из стора
    const loading = useSelector((state) => state.articles.loading)

    //достаем текст ошибки из стора
    const error = useSelector((state) => state.articles.error)

    const api = "https://api.spaceflightnewsapi.net/v4/articles"

    const deleteArticlesFromSTate = () => {
        console.log('delete')
        dispatch(deleteArticles());
    }

    const fetchArticlesFromStote = () => {
        console.log('get')
        dispatch(fetchArticles(api));
    }

    useEffect(() => {
    }, [dispatch]);







    return (
        <div>
            <Button
                variant="contained"
                className="buttonGetApi"
                disableElevation
                size="large"
                onClick={deleteArticlesFromSTate}
            >
                CLEAR
            </Button>


            <Button
                variant="contained"
                className="buttonGetApi"
                disableElevation
                size="large"
                onClick={fetchArticlesFromStote}
            >
                GET API
            </Button>
            {loading && (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            )}
            {!loading && articles.map((article) => (
                <Grid
                    item
                    key={article.id}
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Card sx={{ maxWidth: 465 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={article.image_url}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {article.summary}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
            {error && <p style={{ color: 'red', fontSize: '40px' }}>{error}</p>}
        </div >
    );
}



