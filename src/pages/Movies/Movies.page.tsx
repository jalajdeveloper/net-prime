import { Box } from "@mui/material";
import { getMovies } from "../../services/Apis/movies";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import LoadingAndError from "../../components/LoadingAndError";
import MovieTiles from "../../components/MovieTiles";
import { movieType } from "../../types";

const Movies = () => {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ["movies"],
    async ({ pageParam = 1 }) => {
      const res = await getMovies(pageParam);
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <LoadingAndError error={error} status={status}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5vh" }}>
        {data?.pages.map((res) => (
          <>
            {res.results.map((data: movieType) => (
              <MovieTiles {...data} moviekey={data.id + data.title} key={data.id + data.title}/>
            ))}
          </>
        ))}
      </Box>
    </LoadingAndError>
  );
};

export default Movies;
