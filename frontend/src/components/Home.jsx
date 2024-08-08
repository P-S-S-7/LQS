import { motion } from 'framer-motion';

const Home = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateX: 100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            className="w-full h-screen flex flex-col bg-red-600"
        >
            <div className="w-full h-full flex relative bg-white">
                <div className="hidden lg:flex w-[60%] h-full flex-col items-center">
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('https://res.cloudinary.com/dds1tocvk/image/upload/v1722863786/download_tjjvoy.png')" }}
                    ></div>
                </div>

                <div className="w-full lg:w-3/5 p-6 sm:p-12 flex flex-col items-center justify-center">
                    <div className="absolute top-6 right-6 hidden sm:block">
                        <img
                            src="https://res.cloudinary.com/dds1tocvk/image/upload/v1722890197/lnmquiz-high-resolution-logo-transparent_1_qgkoll.svg"
                            alt="Logo"
                            className="h-12 w-auto lg:h-24"
                        />
                    </div>

                    <div className="sm:hidden mb-6">
                        <img
                            src="https://res.cloudinary.com/dds1tocvk/image/upload/v1722890197/lnmquiz-high-resolution-logo-transparent_1_qgkoll.svg"
                            alt="Logo"
                            className="h-20 w-auto mx-auto"
                        />
                    </div>

                    <div className="w-full flex flex-col items-center">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
