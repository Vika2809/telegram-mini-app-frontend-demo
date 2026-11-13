import { Modal } from '@/shared/ui/Modal/Modal';
import styles from './Onboarding.module.scss';
import money1 from '@/shared/assets/images/money1.png';
import money2 from '@/shared/assets/images/money2.png';
import money3 from '@/shared/assets/images/money3.png';
import pedestal from '@/shared/assets/images/pedestal.png';
import { Button } from '@/shared/ui/Button/Button';
import horses from '@/shared/assets/images/horses.png';
import cn from 'classnames';
import surfaceRed from '@/shared/assets/images/surface-red.svg';
import surfaceTurquoise from '@/shared/assets/images/surface-turquoise.svg';
import surfaceBrown from '@/shared/assets/images/surface-brown.svg';
import horseImage from '@/shared/assets/images/onboarding-image.png';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

export const Onboarding = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const swiperRef = useRef<SwiperRef>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Проверяем localStorage при монтировании компонента
    useEffect(() => {
        const wasShown = localStorage.getItem('onboardingShown');
        if (!wasShown) {
            setShowOnboarding(true);
        }
    }, []);

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    };

    const handleClose = () => {
        localStorage.setItem('onboardingShown', 'true');
        setShowOnboarding(false);
    };

    const handlePlay = () => {
        localStorage.setItem('onboardingShown', 'true');
        setShowOnboarding(false);
    };

    if (!showOnboarding) return null;

    return (
        <Modal isOpen={showOnboarding} onClose={handleClose} className={styles.onboarding} isOnboarding={true}>
            <div className={styles.content}>
                <div className={styles.contentWrapper}>
                    {activeIndex !== 3 && (
                        <div className={styles.header}>
                            <div></div>
                            <div className={styles.headerCenter}>
                                <div className={styles.title}>Tutorial</div>
                            </div>
                            <div className={styles.headerRight}>
                                <button className={styles.skipButton} onClick={handleClose}>
                                    Skip
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={styles.swiperContainer}>
                        <Swiper
                            ref={swiperRef}
                            modules={[Pagination]}
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{
                                clickable: true,
                            }}
                            className={styles.swiper}
                            onSlideChange={handleSlideChange}
                        >
                            <SwiperSlide className={styles.slide}>
                                <div className={styles.slideHeader}>
                                    <div className={styles.slideTitle}>Real cash prize</div>
                                    <div className={styles.slideText}>
                                        Play smart and climb the leaderboard to win real money
                                    </div>
                                </div>
                                <img src={money1} alt="" className={styles.imgMoney1} />
                                <img src={money2} alt="" className={styles.imgMoney2} />
                                <img src={money3} alt="" className={styles.imgMoney3} />
                                <div className={styles.slideMain}>
                                    <div className={styles.bg}></div>
                                    <div className={styles.slideInfo}>
                                        <div className={styles.slideInfoImg}>
                                            <img src={pedestal} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={styles.slide}>
                                <div className={styles.slideHeader}>
                                    <div className={styles.slideTitle}>Pick your horses</div>
                                    <div className={styles.slideText}>Choose horses before the race begins</div>
                                    <div className={styles.slideHeaderWrapper}>
                                        <p>1 / 6</p>
                                        <div className={styles.slideHeaderImage}>
                                            <img src={horses} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.slideMain}>
                                    <div className={styles.bg}></div>
                                    <div className={styles.slideInfo}>
                                        <div className={cn(styles.slideInfoItem, styles.greenBg)}>
                                            <div className={styles.slideInfoItemMain}>
                                                <div className={styles.text}>Race 1 · 15:20</div>
                                                <div className={styles.slideInfoTitle}>Ladbroke grove</div>
                                            </div>
                                            <div className={cn(styles.slideInfoItemButton, styles.buttonBg)}>
                                                <Button>
                                                    <div className={styles.buttonText}>Picked</div>
                                                    <div>
                                                        <div className={styles.buttonImg}>
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M4 7.99999L6.82843 10.8284L12.485 5.17154"
                                                                    stroke="#5cbe09"
                                                                    strokeWidth="1.33333"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={styles.slideInfoItem}>
                                            <div className={styles.slideInfoItemMain}>
                                                <div className={styles.text}>Race 2 · 15:45</div>
                                                <div className={styles.slideInfoTitle}>Brooks fields</div>
                                            </div>
                                            <div className={styles.slideInfoItemButton}>
                                                <Button>Pick</Button>
                                            </div>
                                        </div>
                                        <div className={styles.slideInfoItem}>
                                            <div className={styles.slideInfoItemMain}>
                                                <div className={styles.text}>Race 2 · 15:45</div>
                                                <div className={styles.slideInfoTitle}>High Upton</div>
                                            </div>
                                            <div className={styles.slideInfoItemButton}>
                                                <Button>Pick</Button>
                                            </div>
                                        </div>
                                        <div className={styles.slideInfoItem}>
                                            <div className={styles.slideInfoItemMain}>
                                                <div className={styles.text}>Race 1 · 15:20</div>
                                                <div className={styles.slideInfoTitle}>Ladbroke grove</div>
                                            </div>
                                            <div className={styles.slideInfoItemButton}>
                                                <Button>Pick</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={styles.slide}>
                                <div className={styles.slideHeader}>
                                    <div className={styles.slideTitle}>Free Boost</div>
                                    <div className={styles.slideText}>Give one of your horses a power-up</div>
                                </div>
                                <div className={styles.slideMain}>
                                    <div className={styles.bg}></div>
                                    <div className={styles.slideInfo}>
                                        <div className={cn(styles.slideInfoItem, styles.greenBg, styles.paddingLeft)}>
                                            <div className={styles.slideInfoImage}>
                                                <img src={surfaceRed} alt="" />
                                            </div>
                                            <div className={styles.slideInfoItemMain}>
                                                <div className={styles.text}>Race 1 · 15:20</div>
                                                <div className={styles.slideInfoTitle}>Ladbroke grove</div>
                                            </div>
                                            <div className={cn(styles.slideInfoItemButton, styles.buttonBg)}>
                                                <Button>
                                                    <div className={styles.buttonText}>Picked</div>
                                                    <div>
                                                        <div className={styles.buttonImg}>
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M4 7.99999L6.82843 10.8284L12.485 5.17154"
                                                                    stroke="#5cbe09"
                                                                    strokeWidth="1.33333"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className={cn(styles.slideInfoItem, styles.paddingLeft)}>
                                            <div className={styles.slideInfoImage}>
                                                <img src={surfaceTurquoise} alt="" />
                                            </div>
                                            <div className={styles.slideInfoItemMain}>
                                                <div className={styles.slideInfoItemMain}>
                                                    <img src="" alt="" />
                                                </div>
                                                <div className={styles.text}>Race 2 · 15:45</div>
                                                <div className={styles.slideInfoTitle}>Brooks fields</div>
                                            </div>
                                            <div className={styles.slideInfoItemButton}>
                                                <Button>Pick</Button>
                                            </div>
                                        </div>
                                        <div className={cn(styles.slideInfoItem, styles.paddingLeft)}>
                                            <div className={styles.slideInfoImage}>
                                                <img src={surfaceBrown} alt="" />
                                            </div>
                                            <div className={styles.slideInfoItemMain}>
                                                <div className={styles.text}>Race 2 · 15:45</div>
                                                <div className={styles.slideInfoTitle}>High Upton</div>
                                            </div>
                                            <div className={styles.slideInfoItemButton}>
                                                <Button>Pick</Button>
                                            </div>
                                        </div>
                                        <div className={cn(styles.slideInfoItem, styles.paddingLeft)}>
                                            <div className={styles.slideInfoItemMain}>
                                                <div className={styles.text}>Race 1 · 15:20</div>
                                                <div className={styles.slideInfoTitle}>Ladbroke grove</div>
                                            </div>
                                            <div className={styles.slideInfoItemButton}>
                                                <Button>Pick</Button>
                                            </div>
                                        </div>
                                        <div className={cn(styles.slideInfoItem, styles.paddingLeft)}>
                                            <div className={styles.slideInfoItemMain}></div>
                                            <div className={styles.slideInfoItemButton}></div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className={styles.slide}>
                                <div className={styles.slideImage}>
                                    <img src={horseImage} alt="" />
                                </div>
                                <div className={cn(styles.slideHeader, styles.lastSlideHeader)}>
                                    <div className={styles.slideTitle}>Good luck!</div>
                                    <div className={styles.slideText}>
                                        Let’s see if your picks can bring you to the top!
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={styles.actions}>
                        <Button className={styles.button} onClick={activeIndex === 3 ? handlePlay : handleNext}>
                            {activeIndex === 3 ? 'Play' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
