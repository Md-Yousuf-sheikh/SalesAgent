import {  useEffect } from 'react'
import {
  languageApiSlice,
  useLazyGetLanguageTextsQuery,
} from '../redux/features/language/languageApiSlice'

const useFetchLanguageTexts = lang => {
  //   const currentPostPage = useRef(1)
  const [
    getLanguageTexts,
    {
      isLoading: languageTextsLoading,
      isError: languageTextsError,
      isFetching: languageTextsFetching,
      isSuccess: languageTextsSucceed,
    },
  ] = useLazyGetLanguageTextsQuery()

  const { languageTexts } =
    languageApiSlice.endpoints.getLanguageTexts.useQueryState(
      [lang, 'agentApp'],
      {
        selectFromResult: result => ({
          languageTexts: result?.data,
        }),
      }
    )

  const fetchLanguageTexts = async lang => {
    await getLanguageTexts([lang, 'agentApp'])
  }

  useEffect(() => {
    fetchLanguageTexts(lang)
  }, [lang])

  //   const loadMoreData = async () => {
  //     // if (!hasMorePages || postFetching) return;
  //     currentPostPage.current += 1
  //     await getCommentsByPostId([currentPostPage.current, postId])
  //   }

  return {
    languageTexts,
    getLanguageTexts,
    languageTextsLoading,
    languageTextsError,
    languageTextsFetching,
    languageTextsSucceed,
    fetchLanguageTexts,
  }
}

export default useFetchLanguageTexts
