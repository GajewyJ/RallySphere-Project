import express, { Express, Request, Response , Application } from 'express';
import ralliesRouter from './routes/wrcRalliesRouter';
import teamsRouter from './routes/wrcTeamsRouter';
import newsRouter from './routes/newsRouter';
import wrcDriversRouter from './routes/wrcDriversRouter';

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('RallySphere API');
});

app.use('/wrcRallies', ralliesRouter)
app.use('/wrcTeams', teamsRouter);
app.use('/news', newsRouter);
app.use('/wrcDrivers', wrcDriversRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});