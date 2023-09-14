const SemiBanner = () => {
    return (
        <div className="mt-10 mb-10">
            <div
                className="h-80 bg-cover bg-center flex justify-center items-center text-white relative"
                style={{
                    backgroundImage: 'url("https://demo2.wpopal.com/unity/wp-content/uploads/2019/08/rev_sliderhome1_1.jpg")',
                }}
            >
                <div className="text-center lg:left-[40%] absolute inset-0 flex flex-col justify-center items-center">
                    <h1 className="text-white text-2xl font-bold font-poppins md:text-4xl lg:text-6xl mb-3">
                        We always <br /> see hope
                    </h1>
                    <p className="text-white text-lg lg:text-xl">
                        and then contribute to the structural improvement of the health of  <br/> disadvantaged in South Asia
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SemiBanner;
