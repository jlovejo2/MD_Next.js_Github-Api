import Container from './container';

export default function AppHeader({}) {
    return (
        <header>
            <div className='bg-accent-1 border-b-2 border-accent-2'>
                <Container>
                    <div className="flex flex-col lg:flex-row items-center py-8">
                        <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                            This is a header for the page
                        </h3>
                    </div>
                </Container>
            </div>
        </header>
    )
}