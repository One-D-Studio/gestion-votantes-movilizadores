import { Card, CardBody } from "reactstrap";
import MobilizerCamera from "./MobilizerCamera";

const MobilizerList = () => {

  const data = [
    {
      name: "Franco",
      lastName: "Olmi",
      documento: 4219378,
      circuito: 4,
      id: 1,
    },
    {
      name: "Juan",
      lastName: "Manzur",
      documento: 4219378,
      circuito: 4,
      id: 2,
    },
    {
      name: "Marcos",
      lastName: "Herrera",
      documento: 4219378,
      circuito: 4,
      id: 3,
    },
    {
      name: "Luis",
      lastName: "Beltran",
      documento: 4219378,
      circuito: 4,
      id: 4,
    },
    {
      name: "Jorge",
      lastName: "Olmi",
      documento: 4219378,
      circuito: 4,
      id: 5,
    },
  ];

  return (
    <div className="mt-5">
      <h3 className="container">Movilizadores</h3>
      {data.map((item) => {
        return (
          <Card className="cardMobilizer" key={item.id}>
            <CardBody>
              <p>
                Nombre: {item.name} {item.lastName}
              </p>
              <p>Circuito: {item.circuito}</p>
              <p>Documento: {item.documento}</p>
            </CardBody>
            <div></div>
            <MobilizerCamera/>
          </Card>
        );
      })}
    </div>
  );
};

export default MobilizerList;
