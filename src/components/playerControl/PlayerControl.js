import refreshIcon from './../../assets/refresh.svg';
import volumeIcon from './../../assets/volume.svg';
import volumeMutedIcon from './../../assets/volumeMuted.svg';

import {
    ButtonRefresh,
    ButtonVolume,
    Progressbar,
    ProgressbarDone, ProgressbarDoneMobile,
    ProgressbarMobile,
    WrapperControl
} from "./style";

function Progressbar1({ done, mobile }) {
    return (
        mobile
            ? <ProgressbarMobile>
                <ProgressbarDoneMobile
                    style={{ width: `${done.playedSeconds / done.loadedSeconds * 100}%` }}
                ></ProgressbarDoneMobile>
            </ProgressbarMobile>
            : <Progressbar>
                <ProgressbarDone
                    style={{ width: `${done.playedSeconds / done.loadedSeconds * 100}%` }}
                ></ProgressbarDone>
            </Progressbar>
    );
}

const PlayerControl = ({ setVolume, volume, progress, onClickRestart }) => {
    return (
        <WrapperControl>
            {window?.innerWidth > 900 ?
                <>
                    <ButtonRefresh>
                        <img src={refreshIcon} onClick={onClickRestart} style={{ color: 'white', width: '20px', height: '20px', marginLeft: '60px' }} alt='img' />
                    </ButtonRefresh>
                    <ButtonVolume onClick={() => setVolume(!volume)} style={{ marginRight: '60px' }}>
                        {volume
                            ? <img src={volumeMutedIcon} style={{ color: 'white', width: '20px', height: '20px', marginLeft: '20px' }} alt='img' />
                            : <img src={volumeIcon} style={{ color: 'white', width: '20px', height: '20px', marginLeft: '20px' }} alt='img' />
                        }
                    </ButtonVolume>
                    <Progressbar1 done={progress} />
                </>
                : <Progressbar1 mobile done={progress} />
            }
        </WrapperControl>
    );
};

export default PlayerControl;

