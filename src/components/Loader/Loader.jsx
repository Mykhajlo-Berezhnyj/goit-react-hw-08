import { Vortex } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.backdropStyle}>
    <Vortex
      visible={true}
      height={80}
      width={80}
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  </div>
);
