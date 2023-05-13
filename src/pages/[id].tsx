import addProtocol from '@/util/addProto'
import prisma from '../../prisma/db'

const id = ({ err }: { err: string }) => {
  return <h1>{err}</h1>
}

export const getServerSideProps = async ({ params, res }) => {
  const id = params.id

  if (id) {
    try {
      const update = await prisma.url.update({
        where: {
          uid: id,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      })

      return {
        redirect: {
          destination: addProtocol(update.url),
          permanent: true,
        },
      }
    } catch (error) {
      return {
        props: {
          err: 'url not found',
        },
      }
    }
  }
}

export default id
