// import { serialize } from 'next-mdx-remote/serialize';
// import { MDXRemote } from 'next-mdx-remote';
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from "../components/hero-post";
import Intro from '../components/intro';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import { CMS_NAME } from '../lib/constants';
import Layout from '../components/layout';
import matter from 'gray-matter';
import { useState } from 'react';

export default function Index({ allPosts }) {
    // console.log(allPosts)
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    return (
        <>
            <Layout tableOfContents={allPosts}>
                <Head>
                    <title>Next.js Blog Example with {CMS_NAME}</title>
                </Head>
                    <Container>
                        <Intro />
                        {heroPost && (
                            <HeroPost
                                title={heroPost.title}
                                coverImage={heroPost.coverImage}
                                date={heroPost.date}
                                author={heroPost.author}
                                slug={heroPost.slug}
                                excerpt={heroPost.excerpt}
                            />
                        )}
                        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                    </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const allPosts = getAllPosts([
        'title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'content', 'html' 
    ])

    return {
        props: { allPosts },
    }
}