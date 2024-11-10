const Card = ({ topic, response }) => {
    return (
        <figure class="Card">
            <div>
                <h2>{topic} {response === 'agree' ? '✅' : response === 'disagree' ? '❌' : '⏭️'}</h2>
            </div>
            <legend>Last vote</legend>
        </figure>
    );
};

export default Card;
